===========================
 PowerShell推奨
===========================

■ reactappディレクトリを削除または退避
　（今のreactappを再利用なら退避して後で戻す）
mv reactapp reactapp.tmp

※create-react-app するのではなく、yarn install するなら退避して戻す必要なさそう。


■以下のコマンドでcreate-react-appを実行する。
docker-compose run --rm reactapp sh -c "npm install -g create-react-app && create-react-app reactapp --typescript"


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


■元々あったreactappを再利用するならnode_modulesを退避してあったreactappに移して、ディレクトリ名を元に戻す。
docker-compose stop
mv reactapp/node_modules reactapp.tmp/.
rm -rf reactapp
mv reactapp.tmp reactapp
docker-compose up -d

