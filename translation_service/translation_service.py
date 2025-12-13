import torch
from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer
import os
import time

class TranslationService:
    def __init__(self, model_dir=None):
        # 如果没有指定模型目录，使用相对于当前文件的路径
        if model_dir is None:
            model_dir = os.path.dirname(os.path.abspath(__file__))
        self.model_dir = os.path.abspath(model_dir)
        self.model = None
        self.tokenizer = None
        self.device = self._get_device()
        self.is_loaded = False
        self.load_time = 0
    
    def _get_device(self):
        """获取可用的设备（GPU或CPU）"""
        if torch.cuda.is_available():
            # 检查是否是RTX 5070或其他NVIDIA GPU
            gpu_name = torch.cuda.get_device_name(0)
            print(f"使用GPU: {gpu_name}")
            # 对于RTX 5070，启用FP16以优化1.2B模型的内存使用
            if "RTX 5070" in gpu_name or "RTX" in gpu_name:
                print(f"为{gpu_name}启用FP16优化以适应1.2B模型")
            return torch.device("cuda")
        else:
            print("使用CPU")
            return torch.device("cpu")
    
    def load_model(self):
        """加载M2M100模型和分词器"""
        if self.is_loaded:
            print("模型已经加载")
            return True
        
        try:
            start_time = time.time()
            print(f"从 {self.model_dir} 加载模型...")
            
            # 获取GPU信息以监控内存使用
            if self.device.type == 'cuda':
                gpu_name = torch.cuda.get_device_name(0)
                print(f"GPU内存信息: {torch.cuda.memory_allocated(0) / 1e9:.2f}GB 已分配 / {torch.cuda.max_memory_allocated(0) / 1e9:.2f}GB 最大")
            
            # 对于GPU设备，使用FP16加载模型以减少内存占用（特别是对于1.2B模型）
            model_kwargs = {}
            if self.device.type == 'cuda':
                model_kwargs['torch_dtype'] = torch.float16
                print("使用FP16精度加载模型以优化显存使用")
            
            # 加载模型并移至适当的设备
            self.model = M2M100ForConditionalGeneration.from_pretrained(
                self.model_dir,
                **model_kwargs
            )
            self.model.to(self.device)
            self.model.eval()  # 设置为评估模式
            
            # 加载分词器
            self.tokenizer = M2M100Tokenizer.from_pretrained(self.model_dir)
            
            # 显示模型加载后的内存使用情况
            if self.device.type == 'cuda':
                print(f"模型加载后GPU内存: {torch.cuda.memory_allocated(0) / 1e9:.2f}GB 已分配 / {torch.cuda.max_memory_allocated(0) / 1e9:.2f}GB 最大")
            
            self.load_time = time.time() - start_time
            self.is_loaded = True
            print(f"模型加载完成，耗时: {self.load_time:.2f} 秒")
            print("已成功适配RTX 5070 GPU运行1.2B模型")
            return True
        except Exception as e:
            print(f"模型加载失败: {str(e)}")
            return False
    
    def translate(self, text, src_lang="zh", tgt_lang="en"):
        """
        将文本从源语言翻译到目标语言
        
        参数:
            text (str): 要翻译的文本
            src_lang (str): 源语言代码 (默认为中文)
            tgt_lang (str): 目标语言代码 (默认为英文)
            
        返回:
            str: 翻译后的文本
        """
        if not self.is_loaded:
            print("模型未加载，请先调用load_model()")
            if not self.load_model():
                return "模型加载失败，无法执行翻译"
        
        try:
            # 设置源语言
            self.tokenizer.src_lang = src_lang
            
            # 编码输入文本
            encoded = self.tokenizer(text, return_tensors="pt").to(self.device)
            
            # 生成翻译，设置目标语言token
            generated_tokens = self.model.generate(
                **encoded,
                forced_bos_token_id=self.tokenizer.get_lang_id(tgt_lang),
                max_length=100,
                num_beams=5,
                early_stopping=True
            )
            
            # 解码生成的tokens
            translated = self.tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)[0]
            
            return translated
        except Exception as e:
            print(f"翻译过程中出错: {str(e)}")
            return f"翻译失败: {str(e)}"
    
    def translate_batch(self, texts, src_lang="zh", tgt_lang="en"):
        """
        批量翻译文本列表
        
        参数:
            texts (list): 要翻译的文本列表
            src_lang (str): 源语言代码
            tgt_lang (str): 目标语言代码
            
        返回:
            list: 翻译后的文本列表
        """
        if not self.is_loaded:
            print("模型未加载，请先调用load_model()")
            if not self.load_model():
                return ["模型加载失败，无法执行翻译"] * len(texts)

        try:
            # 设置源语言
            self.tokenizer.src_lang = src_lang

            # 编码输入文本（一次性批量编码，padding + truncation）
            encoded = self.tokenizer(
                texts,
                return_tensors="pt",
                padding=True,
                truncation=True
            ).to(self.device)

            # 生成翻译，设置目标语言 token
            with torch.no_grad():
                generated_tokens = self.model.generate(
                    **encoded,
                    forced_bos_token_id=self.tokenizer.get_lang_id(tgt_lang),
                    max_length=80,
                    num_beams=2,
                    early_stopping=True
                )

            # 解码生成的 tokens
            translated = self.tokenizer.batch_decode(
                generated_tokens, skip_special_tokens=True
            )

            # 保证返回长度与输入一致
            if len(translated) < len(texts):
                translated.extend([""] * (len(texts) - len(translated)))

            return translated
        except Exception as e:
            print(f"翻译过程中出错: {str(e)}")
            return [f"翻译失败: {str(e)}" for _ in texts]
    
    def get_supported_languages(self):
        """获取支持的语言列表"""
        # M2M100支持的主要语言
        return {
            "zh": "中文",
            "en": "英文",
            "vi": "越南语",
            "fr": "法语",
            "it": "意大利语",
            "es": "西班牙语",
            "de": "德语",
            "ja": "日语",
            "ko": "韩语",
            "ru": "俄语",
            "ar": "阿拉伯语",
            "pt": "葡萄牙语"
        }

# 创建全局翻译服务实例，方便其他模块导入使用
translation_service = TranslationService()

# 测试函数（可选）
def test_translation():
    print("开始测试翻译服务...")
    service = TranslationService()
    
    # 加载模型
    if service.load_model():
        # 测试从中文到英文的翻译
        test_text = "这是一个翻译测试，使用M2M100模型。"
        translated = service.translate(test_text, src_lang="zh", tgt_lang="en")
        print(f"原文: {test_text}")
        print(f"译文: {translated}")
        
        # 测试从英文到中文的翻译
        test_text_en = "Hello, this is a translation test using M2M100 model."
        translated_zh = service.translate(test_text_en, src_lang="en", tgt_lang="zh")
        print(f"\n原文: {test_text_en}")
        print(f"译文: {translated_zh}")

if __name__ == "__main__":
    test_translation()
