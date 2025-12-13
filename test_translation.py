import sys
import os
# 添加translation_service目录到Python路径
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'translation_service'))

from translation_service.translation_service import TranslationService

# 创建翻译服务实例，使用models_translation子目录
translation_service = TranslationService(model_dir=os.path.join(os.path.dirname(os.path.abspath(__file__)), 'translation_service', 'models_translation'))

# 尝试加载模型
print("正在加载模型...")
result = translation_service.load_model()
if result:
    print("模型加载成功!")
    # 测试翻译
    translated = translation_service.translate("这是一个测试", "zh", "en")
    print(f"翻译结果: {translated}")
else:
    print("模型加载失败!")