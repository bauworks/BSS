# 第12回BSS（Containerize a .NET Core app）

日時　：2020年8月19日(水)
参加者：古川・有川・森(発表者)

---

Dockerを使用して.NET Core Appをコンテナー化する。  
MS DocsのTutorialにそって手を動かしてみる。  
[チュートリアル： NET Coreアプリのコンテナー化](https://docs.microsoft.com/ja-jp/dotnet/core/docker/build-container?tabs=windows)

1. .NET Coreアプリを作成＆発行
2. .NET Core用のDockerfileを作成して構成
3. Dockerイメージの構築
4. Dockerコンテナーを作成して実行
5. コンテナーを削除
6. 単一実行
7. 重要なコマンド
8. ついでに

## 1. .NET Coreアプリを作成＆発行

### .NET Coreアプリ作成
```sh
[xxxx]$ mkdir docker-working
[xxxx]$ cd docker-working/
[docker-working]$ dotnet new console -o App -n NetCore.Docker
The template "Console Application" was created successfully.

Processing post-creation actions...
Running 'dotnet restore' on App/NetCore.Docker.csproj...
  復元対象のプロジェクトを決定しています...
  /Users/xxxx/dotnetcore/docker-working/App/NetCore.Docker.csproj を復元しました (145 ms)。

Restore succeeded.
```

### アプリ実行
```sh
[docker-working]$ cd App
[App]$ dotnet run
Hello World!
```

### プログラムの修正
```c#
class Program
{
    static async Task Main(string[] args)
    {
        var counter = 0;
        var max = args.Length != 0 ? Convert.ToInt32(args[0]) : -1;
        while (max == -1 || counter < max)
        {
            Console.WriteLine($"Counter: {++counter}");
            await Task.Delay(1000);
        }
    }
}
```

### .NET Coreアプリの発行

```sh
[App]$ dotnet publish -c Release
.NET Core 向け Microsoft (R) Build Engine バージョン 16.6.0+5ff7b0c9e
Copyright (C) Microsoft Corporation.All rights reserved.

  復元対象のプロジェクトを決定しています...
  復元対象のすべてのプロジェクトは最新です。
  NetCore.Docker -> /xxxx/dotnetcore/docker-working/App/bin/Release/netcoreapp3.1/NetCore.Docker.dll
  NetCore.Docker -> /xxxx/dotnetcore/docker-working/App/bin/Release/netcoreapp3.1/publish/
[App]$ cd docker-working/
```

.\App\bin\Release\netcoreapp3.1\publish\ に、dllなどが作成される。  

## 2. .NET Core用のDockerfileを作成して構成

Dockerfile :  
　`docker build`時に使用される、コンテナ―イメージを作成するためのファイル。  
　拡張子はなし。  

### Dockerfile作成
.csprojと同階層にDockerfileというファイルを作成し編集  

```dockerfile
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
```
※[公式の .NET Docker イメージ](https://docs.microsoft.com/ja-jp/dotnet/architecture/microservices/net-core-net-framework-containers/official-net-docker-images)

## 3. Dockerイメージの構築
### Docker ビルド
```sh
[App]$ docker build -t counter-image -f Dockerfile .
Sending build context to Docker daemon  254.5kB
Step 1/1 : FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
3.1: Pulling from dotnet/core/aspnet
bf5952930446: Pull complete 
95f9f5484a21: Pull complete 
ebc43d54b0d9: Pull complete 
eb8b3fc30ae1: Pull complete 
c42d79623507: Pull complete 
Digest: sha256:07d9cfc7442360e2827b638e78d15e24f6b1c108ffa68d9ba29f3ab699b41edf
Status: Downloaded newer image for mcr.microsoft.com/dotnet/core/aspnet:3.1
 ---> bdca989bc8d3
Successfully built bdca989bc8d3
Successfully tagged counter-image:latest
```

### インストールされたイメージの一覧を表示
```sh
[App]$ docker images
REPOSITORY                             TAG                 IMAGE ID            CREATED             SIZE
counter-image                          latest              bdca989bc8d3        3 days ago          207MB
mcr.microsoft.com/dotnet/core/aspnet   3.1                 bdca989bc8d3        3 days ago          207MB
```

※Dockerfile での唯一のコマンドが既存のイメージを新しいイメージの基にするものであったため、  
　両方のイメージで値が同じになっている。  

### Dockerfileに追記
```dockerfile
#自分のコンピューターの指定したフォルダをコンテナー内のフォルダーにコピーするよう Docker に指示
#"publish" フォルダーを、コンテナーの "App" フォルダにコピー
COPY bin/Release/netcoreapp3.1/publish/ App/
#コンテナー内の現在のディレクトリを、"App" に変更
WORKDIR /App
#実行可能ファイルとして実行するためにコンテナーを構成するよう Docker に指示
#コンテナーの起動時に、ENTRYPOINT コマンドが実行される
#このコマンドが終了すると、コンテナーは自動的に停止する
ENTRYPOINT ["dotnet", "NetCore.Docker.dll"]
```

### Docker 再ビルド＆イメージリストの再確認
```sh
[App]$ docker build -t counter-image -f Dockerfile .
Sending build context to Docker daemon    255kB
Step 1/4 : FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
 ---> bdca989bc8d3
Step 2/4 : COPY bin/Release/netcoreapp3.1/publish/ App/
 ---> 594f27628b48
Step 3/4 : WORKDIR /App
 ---> Running in a2dc597f2629
Removing intermediate container a2dc597f2629
 ---> a0d6e2224149
Step 4/4 : ENTRYPOINT ["dotnet", "NetCore.Docker.dll"]
 ---> Running in d02c71fd07d8
Removing intermediate container d02c71fd07d8
 ---> 3cb86583a13e
Successfully built 3cb86583a13e
Successfully tagged counter-image:latest

[App]$ docker images
REPOSITORY                             TAG                 IMAGE ID            CREATED             SIZE
counter-image                          latest              3cb86583a13e        11 seconds ago      207MB
mcr.microsoft.com/dotnet/core/aspnet   3.1                 bdca989bc8d3        3 days ago          207MB
```
## 4. Dockerコンテナーを作成して実行

### コンテナー作成
```sh
[App]$ docker create --name core-counter counter-image
7c166c181e7d92702a0388aaea3732eaa796721ba8b6a03837fc99b62a02f4f7
```
※作成されたコンテナーのCONTAINER IDが表示される  

### すべてのコンテナー一覧を表示
```sh
[App]$ docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS               NAMES
7c166c181e7d        counter-image       "dotnet NetCore.Dock…"   About a minute ago   Created                                 core-counter
```
`-a`で停止中のコンテナーも確認できる。  

### DockerDesktopのDashboardを確認
<img width="1152" 
     alt="docker-create" 
     src="https://user-images.githubusercontent.com/38059866/90340902-375e3c80-e036-11ea-9ebc-bcd6e43fc5b2.png">

### コンテナー起動
```sh
[App]$ docker start core-counter
core-counter
[App]$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
7c166c181e7d        counter-image       "dotnet NetCore.Dock…"   24 minutes ago      Up 9 seconds                            core-counter
```

### DockerDesktopのDashboardを確認
<img width="1152" 
     alt="docler-start" src="https://user-images.githubusercontent.com/38059866/90340903-39280000-e036-11ea-9abb-0ef3fd5c3cab.png">

### コンテナー停止
```sh
[App]$ docker stop core-counter
core-counter
[App]$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```

### DockerDesktopのDashboardを確認
<img width="1152" 
     alt="docker-stop" 
     src="https://user-images.githubusercontent.com/38059866/90340906-39c09680-e036-11ea-80a0-9120d6252232.png">

ようやく準備完了。  
コンテナーを実行状態にし、接続して出力を確認。  

### コンテナーの起動
```sh
[App]$ docker start core-counter
core-counter
```

### 出力の確認（アタッチ）
```sh
[App]$ docker attach --sig-proxy=false core-counter
Counter: 5
Counter: 6
Counter: 7
Counter: 8
Counter: 9
^C
```
※`Ctrl + C`で実行中のコンテナーからデタッチ。  
　このキー入力によりコンテナー内のプロセスは終了する。  
　アタッチ時に`--sig-proxy=false`を指定すると`Ctrl + C`を入力しても  
　コンテナー内のプロセスは停止しない。  

### 再アタッチ
```sh
[App]$ docker attach --sig-proxy=false core-counter
Counter: 18
Counter: 19
Counter: 20
Counter: 21
Counter: 22
^C
```
※デタッチしても実行されていることが確認できる。  

### コンテナーの停止
```sh
[App]$ docker stop core-counter
core-counter
```

### アタッチしてみる
```sh
[App]$ docker attach --sig-proxy=false core-counter
You cannot attach to a stopped container, start it first
```
※当然、コンテナーは停止してるのでアタッチできませんよと。  

## 5. コンテナーを削除

### 削除前にコンテナーを停止
```sh
[App]$ docker stop core-counter
```
### コンテナー一覧を表示
```sh
[App]$ docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                        PORTS               NAMES
7c166c181e7d        counter-image       "dotnet NetCore.Dock…"   25 hours ago        Exited (143) 14 minutes ago                       core-counter
```

### コンテナーを削除
```sh
[App]$ docker rm core-counter
core-counter
```

### コンテナー一覧を再確認
```sh
[App]$ docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```

## 6. 単一実行
`docker run`により、`docker create`からの`docker start`の必要なし。  
コンテナーが停止したら自動的にコンテナーを削除することも可能。  

### 実行
```sh
[App]$ docker run -it --rm counter-image
Counter: 1
Counter: 2
Counter: 3
Counter: 4
Counter: 5
Counter: 6
^C[App]$ 
```

### 実行中と実行後のDocker Desktopのキャプチャ

■ 実行中  
<img width="1152" 
     alt="docker-running" 
     src="https://user-images.githubusercontent.com/38059866/90546295-d022c280-e1c4-11ea-86d1-22cd266d4393.png">

■ 実行後  
<img width="1152" 
     alt="docker-stop-after run" 
     src="https://user-images.githubusercontent.com/38059866/90546300-d1ec8600-e1c4-11ea-85d2-dfb47797fd10.png">


また、コンテナーは.NET Core App の実行にパラメータを渡すことも可能。  

```sh
[App]$ docker run -it --rm counter-image 3
Counter: 1
Counter: 2
Counter: 3
[App]$ 
```

## 7. 重要なコマンド

- [docker build](https://docs.docker.com/engine/reference/commandline/build/)
- [docker run](https://docs.docker.com/engine/reference/commandline/run/)
- [docker ps](https://docs.docker.com/engine/reference/commandline/ps/)
- [docker stop](https://docs.docker.com/engine/reference/commandline/stop/)
- [docker rm](https://docs.docker.com/engine/reference/commandline/rm/)
- [docker rmi](https://docs.docker.com/engine/reference/commandline/rmi/)
- [docker image](https://docs.docker.com/engine/reference/commandline/image/)

## 8. ついでに

コンテナーを起動して、コンテナー内のAppフォルダー直下を確認してみる。

```sh
[App]$ docker start core-counter
core-counter
[App]$ docker exec -it core-counter /bin/bash
root@eb42ea06e214:/App# ls -l
total 20
-rw-r--r-- 1 root root  412 Aug 14 16:47 NetCore.Docker.deps.json
-rw-r--r-- 1 root root 6144 Aug 14 16:47 NetCore.Docker.dll
-rw-r--r-- 1 root root  904 Aug 14 16:47 NetCore.Docker.pdb
-rw-r--r-- 1 root root  146 Aug 14 16:47 NetCore.Docker.runtimeconfig.json
```

OSの確認してみる
```sh
root@eb42ea06e214:/App# cd ..

root@eb42ea06e214:/# cat /etc/*release
PRETTY_NAME="Debian GNU/Linux 10 (buster)"
NAME="Debian GNU/Linux"
VERSION_ID="10"
VERSION="10 (buster)"
VERSION_CODENAME=buster
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"

root@eb42ea06e214:/# cat /etc/*version
10.5
```

