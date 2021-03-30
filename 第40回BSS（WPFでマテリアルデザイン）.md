# 第40回BSS（WPFでマテリアルデザイン）

日時　：2021年 3月30日(水)  
参加者：古川・森・有川(発表者)

---

## 今回の趣旨
- Material Design In Xaml Toolkitを使ってWPFアプリを今っぽくする。

## 目次
1. [MaterialDesignInXamlToolkitとは](#1)
1. [MaterialデザインなしのWPFアプリ](#2)
1. [MaterialDesignInXamlToolkitインストール](#3)
1. [結果](#4)

## 1. MaterialDesignInXamlToolkitとは <a id="1"></a>

WPFアプリのデザインをマテリアルデザインにしてくれるToolkit

## 2. MaterialデザインなしのWPFアプリ <a id="2"></a>
↓こんなかんじ。イモっぽい！  
![画像1](https://user-images.githubusercontent.com/66286964/112943991-2dc0b980-916d-11eb-88cd-50b69cfe5966.png)



## 3. MaterialDesignInXamlToolkitインストール <a id="3"></a>
マテリアルデザインを適用したいプロジェクトにNuGetでパッケージを追加。
![画像6](https://user-images.githubusercontent.com/66286964/112943990-2d282300-916d-11eb-9e34-3bcf8805c31b.png)


MaterialDesignThema.MahAppを追加
![画像5](https://user-images.githubusercontent.com/66286964/112943989-2c8f8c80-916d-11eb-850e-6b042cde8a8c.png)


App.xamlに以下を追加
``` xaml
        <ResourceDictionary.MergedDictionaries>
            <ResourceDictionary Source="pack://application:,,,/MaterialDesignThemes.Wpf;component/Themes/MaterialDesignTheme.Light.xaml" />
            <ResourceDictionary Source="pack://application:,,,/MaterialDesignThemes.Wpf;component/Themes/MaterialDesignTheme.Defaults.xaml" />
            <ResourceDictionary Source="pack://application:,,,/MaterialDesignColors;component/Themes/Recommended/Primary/MaterialDesignColor.DeepPurple.xaml" />
            <ResourceDictionary Source="pack://application:,,,/MaterialDesignColors;component/Themes/Recommended/Accent/MaterialDesignColor.Lime.xaml" />
        </ResourceDictionary.MergedDictionaries>
```



## 4. 結果 <a id="4"></a>
↓こんな感じになります。イマっぽい！
![画像4](https://user-images.githubusercontent.com/66286964/112943971-28636f00-916d-11eb-9be5-2e1d7b5f7c3b.png)
