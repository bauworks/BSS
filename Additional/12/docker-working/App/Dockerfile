FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

#自分のコンピューターの指定したフォルダをコンテナー内のフォルダーにコピーするよう Docker に指示
#"publish" フォルダーを、コンテナーの "App" フォルダにコピー
COPY bin/Release/netcoreapp3.1/publish/ App/
#コンテナー内の現在のディレクトリを、"App" に変更
WORKDIR /App
#実行可能ファイルとして実行するためにコンテナーを構成するよう Docker に指示
#コンテナーの起動時に、ENTRYPOINT コマンドが実行される
#このコマンドが終了すると、コンテナーは自動的に停止する
ENTRYPOINT ["dotnet", "NetCore.Docker.dll"]