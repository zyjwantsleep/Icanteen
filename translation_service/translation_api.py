from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import logging
from .translation_service import TranslationService

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# 创建Flask应用
app = Flask(__name__)
CORS(app)  # 启用跨域请求支持

# 初始化翻译服务
translation_service = TranslationService()
# 模型加载状态标记
model_loaded = False


@app.route('/api/translate', methods=['POST'])
def translate():
    """
    翻译API端点
    接收JSON格式的请求，包含要翻译的文本、源语言和目标语言
    """
    try:
        # 获取请求数据
        data = request.get_json()

        # 验证必要参数
        if not data or 'text' not in data:
            return jsonify({
                'success': False,
                'error': '缺少必要参数: text'
            }), 400

        # 获取参数，设置默认值
        text = data['text']
        src_lang = data.get('src_lang', 'zh')
        tgt_lang = data.get('tgt_lang', 'en')

        # 确保模型已加载
        global model_loaded
        if not model_loaded:
            logger.info("正在加载翻译模型...")
            if not translation_service.load_model():
                return jsonify({
                    'success': False,
                    'error': '模型加载失败'
                }), 500
            model_loaded = True
            logger.info("模型加载成功")

        # 执行翻译
        logger.info(f"翻译请求: 从{src_lang}到{tgt_lang}, 文本长度: {len(text)}字符")
        translated_text = translation_service.translate(text, src_lang, tgt_lang)

        # 返回结果
        return jsonify({
            'success': True,
            'original_text': text,
            'translated_text': translated_text,
            'src_lang': src_lang,
            'tgt_lang': tgt_lang
        })

    except Exception as e:
        logger.error(f"翻译请求处理失败: {str(e)}")
        return jsonify({
            'success': False,
            'error': f'服务器错误: {str(e)}'
        }), 500


@app.route('/api/translate-batch', methods=['POST'])
def translate_batch():
    """
    批量翻译API端点
    接收JSON格式的请求，包含文本列表、源语言和目标语言
    """
    try:
        # 获取请求数据
        data = request.get_json()

        # 验证必要参数
        if not data or 'texts' not in data or not isinstance(data['texts'], list):
            return jsonify({
                'success': False,
                'error': '缺少必要参数: texts (必须是列表)'
            }), 400

        # 获取参数，设置默认值
        texts = data['texts']
        src_lang = data.get('src_lang', 'zh')
        tgt_lang = data.get('tgt_lang', 'en')

        # 限制批量翻译的文本数量，避免服务器过载
        max_batch_size = 10
        if len(texts) > max_batch_size:
            return jsonify({
                'success': False,
                'error': f'批量翻译数量超过限制，最大支持{max_batch_size}条'
            }), 400

        # 确保模型已加载
        global model_loaded
        if not model_loaded:
            logger.info("正在加载翻译模型...")
            if not translation_service.load_model():
                return jsonify({
                    'success': False,
                    'error': '模型加载失败'
                }), 500
            model_loaded = True
            logger.info("模型加载成功")

        # 执行批量翻译
        logger.info(f"批量翻译请求: 从{src_lang}到{tgt_lang}, 文本数量: {len(texts)}")
        translated_texts = translation_service.translate_batch(texts, src_lang, tgt_lang)

        # 构建结果列表
        results = []
        for original, translated in zip(texts, translated_texts):
            results.append({
                'original_text': original,
                'translated_text': translated
            })

        # 返回结果
        return jsonify({
            'success': True,
            'results': results,
            'src_lang': src_lang,
            'tgt_lang': tgt_lang
        })

    except Exception as e:
        logger.error(f"批量翻译请求处理失败: {str(e)}")
        return jsonify({
            'success': False,
            'error': f'服务器错误: {str(e)}'
        }), 500


@app.route('/api/languages', methods=['GET'])
def get_languages():
    """
    获取支持的语言列表
    """
    try:
        languages = translation_service.get_supported_languages()
        return jsonify({
            'success': True,
            'languages': languages
        })
    except Exception as e:
        logger.error(f"获取语言列表失败: {str(e)}")
        return jsonify({
            'success': False,
            'error': f'服务器错误: {str(e)}'
        }), 500


@app.route('/api/status', methods=['GET'])
def get_status():
    """
    获取翻译服务状态
    """
    try:
        global model_loaded
        return jsonify({
            'success': True,
            'status': 'running',
            'model_loaded': model_loaded,
            'model_path': translation_service.model_dir,
            'device': str(translation_service.device)
        })
    except Exception as e:
        logger.error(f"获取服务状态失败: {str(e)}")
        return jsonify({
            'success': False,
            'error': f'服务器错误: {str(e)}'
        }), 500


@app.route('/api/load-model', methods=['POST'])
def load_model():
    """
    预加载翻译模型的API端点
    可以在服务启动后立即调用此接口来加载模型，避免首次翻译时的延迟
    """
    try:
        global model_loaded
        if not model_loaded:
            logger.info("预加载翻译模型...")
            if translation_service.load_model():
                model_loaded = True
                logger.info("模型预加载成功")
                return jsonify({
                    'success': True,
                    'message': '模型加载成功',
                    'load_time': translation_service.load_time
                })
            else:
                logger.error("模型预加载失败")
                return jsonify({
                    'success': False,
                    'error': '模型加载失败'
                }), 500
        else:
            return jsonify({
                'success': True,
                'message': '模型已经加载'
            })
    except Exception as e:
        logger.error(f"预加载模型失败: {str(e)}")
        return jsonify({
            'success': False,
            'error': f'服务器错误: {str(e)}'
        }), 500


if __name__ == '__main__':
    # 获取端口配置，默认 5001，避免与 Node 服务冲突
    port = int(os.environ.get('PORT', 5001))

    logger.info(f"启动翻译API服务，端口 {port}")

    # 在生产环境中，应该使用 Gunicorn 或其他 WSGI 服务器
    # 这里使用 Flask 内置服务器仅用于开发和测试
    app.run(host='0.0.0.0', port=port, debug=False)

# 使用说明:
# 1. 启动服务: python translation_api.py
# 2. 服务默认运行在: http://localhost:5001
# 3. API端点:
#    - POST /api/translate       - 单条翻译
#    - POST /api/translate-batch - 批量翻译
#    - GET  /api/languages       - 获取支持的语言列表
#    - GET  /api/status          - 获取服务状态
#    - POST /api/load-model      - 预加载模型
# 4. 示例请求:
#    curl -X POST http://localhost:5001/api/translate \
#    -H "Content-Type: application/json" \
#    -d '{"text": "这是一段测试文本", "src_lang": "zh", "tgt_lang": "en"}'
