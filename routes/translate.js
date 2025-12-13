const express = require("express");
const http = require("http");

const router = express.Router();

// 翻译服务配置：默认连接本机 Flask 翻译服务
const TRANSLATE_API_HOST = process.env.TRANSLATE_API_HOST || "127.0.0.1";
const TRANSLATE_API_PORT = parseInt(process.env.TRANSLATE_API_PORT || "5001", 10);

// 与后端翻译模型兼容的一组语言代码
const TRANSLATE_SUPPORTED_TARGETS = new Set([
    "zh",
    "en",
    "vi",
    "fr",
    "it",
    "es",
    "de",
    "ja",
    "ko",
    "ru",
    "ar",
    "pt"
]);

// 简单的语言检测（基于字符范围的启发式判断）
function detectLang(text) {
    if (!text) {
        return "en";
    }
    // 中文
    if (/[\u4e00-\u9fff]/.test(text)) {
        return "zh";
    }
    // 日文（平假名 + 片假名）
    if (/[\u3040-\u30ff]/.test(text)) {
        return "ja";
    }
    // 韩文
    if (/[\uac00-\ud7af]/.test(text)) {
        return "ko";
    }
    // 俄文
    if (/[А-Яа-яЁё]/.test(text)) {
        return "ru";
    }
    // 阿拉伯文
    if (/[\u0600-\u06FF]/.test(text)) {
        return "ar";
    }
    // 西班牙语的一些常见特殊字符
    if (/[ñÑáéíóúÁÉÍÓÚ¿¡]/.test(text)) {
        return "es";
    }
    // 默认按英文处理
    return "en";
}

function normalizeTargetLang(uiLang) {
    let tgt = (uiLang || "zh").toLowerCase();
    if (!TRANSLATE_SUPPORTED_TARGETS.has(tgt)) {
        // 翻译模型未显式支持的语言（例如 vi / it），统一先翻译成英文
        tgt = "en";
    }
    return tgt;
}

function callTranslateAPI(text, srcLang, tgtLang) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({
            text,
            src_lang: srcLang,
            tgt_lang: tgtLang
        });

        const options = {
            hostname: TRANSLATE_API_HOST,
            port: TRANSLATE_API_PORT,
            path: "/api/translate",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(payload)
            },
            timeout: 30000
        };

        const req = http.request(options, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json);
                } catch (e) {
                    reject(e);
                }
            });
        });

        req.on("error", (err) => {
            reject(err);
        });

        req.on("timeout", () => {
            req.destroy();
            reject(new Error("translate_api_timeout"));
        });

        req.write(payload);
        req.end();
    });
}

// 通用翻译接口：用于食堂简介和评论内容
router.post("/translate", async function (req, res) {
    try {
        const body = req.body || {};
        const text = (body.text || "").toString();
        const uiLang = (body.targetLang || "").toString();

        if (!text.trim()) {
            return res.status(400).json({
                success: false,
                error: "empty_text"
            });
        }

        const srcLang = detectLang(text);
        const tgtLang = normalizeTargetLang(uiLang);

        const apiResult = await callTranslateAPI(text, srcLang, tgtLang);

        if (!apiResult || apiResult.success !== true) {
            return res.status(500).json({
                success: false,
                error: "translate_api_error"
            });
        }

        return res.json({
            success: true,
            translatedText: apiResult.translated_text || "",
            srcLang,
            tgtLang
        });
    } catch (err) {
        console.error("Translate route error:", err);
        return res.status(500).json({
            success: false,
            error: "server_error"
        });
    }
});

module.exports = router;
