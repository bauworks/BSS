===========================
 WindowsならPowerShell推奨
===========================

■関連パッケージをインストール
yarn install するなら退避して戻す必要なさそう。


# Success! Created reactapp at /usr/src/app/reactapp
# Inside that directory, you can run several commands:
# 
#   yarn start
#     Starts the development server.
# 
#   yarn build
#     Bundles the app into static files for production.
# 
#   yarn test
#     Starts the test runner.
# 
#   yarn eject
#     Removes this tool and copies build dependencies, configuration files
#     and scripts into the app directory. If you do this, you can’t go back!
# 
# We suggest that you begin by typing:
# 
#   cd reactapp
#   yarn start
# 
# Happy hacking!

■Docker Desktop を立ち上げて、react-sample が見当たらなければもう一度upする。
docker-compose up -d


■サンプルアプリの動作を確認
http://loalhost:3000/

  もし動いていなかったら、Dockerの中に入ってyarn start
    docker exec -it react-sample_node_1 /bin/sh
    cd react-sample
    yarn start

■好きなだけソースコードを修正しよう。
  react-todo\reactapp\src


