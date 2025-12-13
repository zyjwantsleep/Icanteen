#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
启动翻译服务的脚本
提供配置选项并启动Flask API服务
"""

import os
import sys
import argparse
import subprocess
import logging
import importlib.util
import time

# 添加当前目录到Python路径，以便正确导入模块
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def setup_logging():
    """配置日志"""
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.StreamHandler()
        ]
    )
    return logging.getLogger(__name__)

def check_requirements(logger):
    """检查是否安装了必要的依赖"""
    try:
        import torch
        import transformers
        import flask
        import flask_cors
        logger.info("所有必要的依赖都已安装")
        return True
    except ImportError as e:
        error_msg = str(e)
        logger.error(f"缺少必要的依赖: {error_msg}. 请运行 'pip install -r requirements.txt'")
        return False

def check_gpu(logger):
    """检查GPU是否可用"""
    try:
        import torch
        if torch.cuda.is_available():
            gpu_count = torch.cuda.device_count()
            gpu_name = torch.cuda.get_device_name(0)
            logger.info(f"检测到 {gpu_count} 个可用的GPU: {gpu_name}")
            return True
        else:
            logger.warning("未检测到可用的GPU，将使用CPU进行推理")
            return False
    except Exception as e:
        logger.error(f"检查GPU时出错: {str(e)}")
        return False

def start_service(port, debug=False, use_reloader=False):
    """启动翻译API服务"""
    # 设置环境变量
    os.environ['PORT'] = str(port)
    
    # 构建启动命令
    cmd = [sys.executable, 'translation_api.py']
    
    logger.info(f"正在启动翻译API服务，端口: {port}")
    logger.info(f"服务地址: http://localhost:{port}")
    logger.info(f"调试模式: {'开启' if debug else '关闭'}")
    logger.info("按 Ctrl+C 停止服务")
    
    try:
        # 使用subprocess运行服务
        process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        # 实时输出服务日志
        while True:
            stdout_line = process.stdout.readline()
            stderr_line = process.stderr.readline()
            
            if stdout_line:
                print(f"[服务输出] {stdout_line.strip()}")
            if stderr_line:
                print(f"[服务错误] {stderr_line.strip()}")
            
            # 检查进程是否结束
            if process.poll() is not None:
                # 输出剩余的日志
                for stdout_line in process.stdout:
                    print(f"[服务输出] {stdout_line.strip()}")
                for stderr_line in process.stderr:
                    print(f"[服务错误] {stderr_line.strip()}")
                
                logger.info(f"服务已停止，退出码: {process.returncode}")
                break
    
    except KeyboardInterrupt:
        logger.info("接收到停止信号，正在关闭服务...")
        process.terminate()
        try:
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()
        logger.info("服务已关闭")
    except Exception as e:
        logger.error(f"启动服务时出错: {str(e)}")

def main():
    """主函数"""
    global logger
    logger = setup_logging()
    
    # 解析命令行参数
    parser = argparse.ArgumentParser(description='启动翻译API服务')
    parser.add_argument('--port', type=int, default=8000, help='服务端口 (默认: 8000)')
    parser.add_argument('--debug', action='store_true', help='启用调试模式')
    parser.add_argument('--no-reloader', action='store_true', help='禁用自动重载')
    parser.add_argument('--check-only', action='store_true', help='仅检查环境，不启动服务')
    
    args = parser.parse_args()
    
    # 检查环境
    logger.info("开始检查环境...")
    
    # 检查依赖
    if not check_requirements(logger):
        logger.error("环境检查失败，无法启动服务")
        return 1
    
    # 检查GPU
    check_gpu(logger)
    
    # 检查模型目录是否存在
    model_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'models_translation')
    if os.path.exists(model_dir) and os.path.isdir(model_dir):
        model_files = os.listdir(model_dir)
        if any(f.endswith('.safetensors') or f.endswith('.bin') for f in model_files):
            logger.info(f"模型目录存在且包含模型文件: {model_dir}")
        else:
            logger.warning(f"模型目录存在但可能缺少模型文件: {model_dir}")
    else:
        logger.error(f"模型目录不存在: {model_dir}")
        return 1
    
    if args.check_only:
        logger.info("环境检查完成，未启动服务")
        return 0
    
    # 启动服务
    start_service(args.port, args.debug, not args.no_reloader)
    
    return 0

if __name__ == '__main__':
    sys.exit(main())

"""
使用说明:

1. 基本启动：
   python start_translation_service.py

2. 指定端口启动：
   python start_translation_service.py --port 8080

3. 启用调试模式：
   python start_translation_service.py --debug

4. 仅检查环境，不启动服务：
   python start_translation_service.py --check-only

5. 禁用自动重载：
   python start_translation_service.py --no-reloader
"""