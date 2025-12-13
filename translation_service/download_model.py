from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer
import os

# 设置模型保存路径为当前目录
model_dir = os.path.abspath('.')
model_name = "facebook/m2m100_1.2B"  # 使用更大的1.2B版本以提高翻译质量

print(f"开始下载模型 {model_name} 到 {model_dir}")

# 下载并保存模型
model = M2M100ForConditionalGeneration.from_pretrained(model_name)
model.save_pretrained(model_dir)

# 下载并保存分词器
tokenizer = M2M100Tokenizer.from_pretrained(model_name)
tokenizer.save_pretrained(model_dir)

print(f"模型下载完成！已保存在 {model_dir}")
print("文件列表:")
for file in os.listdir(model_dir):
    if file.startswith('config') or file.endswith('.bin') or file.endswith('.json') or file.endswith('.txt'):
        print(f"- {file}")