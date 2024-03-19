# VScode  uni-app 环境注释高亮代码块

## **setting.json**

```json
{
  // 配置平台颜色
  "uni-code-highlight-xthk.platform": {
    "VUE3": "#41b883",
    "VUE2": "#41b883",
    "UNI-APP-X": "#2b9939",
    "APP": "#80bd00",
    "APP-PLUS": "#80bd00",
    "APP-PLUS-NVUE": "#41b883",
    "APP-NVUE": "#41b883",
    "APP-ANDROID": "#80bd00",
    "APP-IOS": "#d9774b",
    "H5": "#e5c07b",
    "WEB": "#e5c07b",
    "MP-WEIXIN": "#2aae67",
    "MP-ALIPAY": "#ff6a00",
    "MP-BAIDU": "#2932e1",
    "MP-TOUTIAO": "#f04142",
    "MP-LARK": "#00d6b9",
    "MP-QQ": "#025aef",
    "MP-KUAISHOU": "#ff5005",
    "MP-JD": "#e21e17",
    "MP-360": "#00aa48",
    "MP": "#2aae67",
    "QUICKAPP-WEBVIEW": "#4497ff",
    "QUICKAPP-WEBVIEW-UNION": "#4497ff",
    "QUICKAPP-WEBVIEW-HUAWEI": "#e60214",
  },
  // 配置if条件注释高亮颜色
  "uni-code-highlight-xthk.prefix":  "#41b883"
}
```

基于 https://marketplace.visualstudio.com/items?itemName=uni-helper.uni-highlight-vscode 插件进行的二次修改，感谢 uni-code-highlight-xthk-vscode 插件作者提供的思路和底层代码设计
