# 第30回BSS（LINUXのネットワーク系コマンド)

日時　：2020年 12月23日(水)  
参加者：古川(発表者)・有川・森

---
## 今回の趣旨
- LINUXのネットワーク系コマンドを学ぶ
- MacにC#開発環境を作ってみる

## 目次
1. [LINUXのネットワーク系コマンド](#1) 
    1. [ネットワーク系コマンドいろいろ](#1-1)
    1. [xinetdで簡易サービスを作ってみる](#1-2)

1. [C#開発環境 on Mac](#2)
    1. [参考サイト](#2-1)


## 1. LINUXのネットワーク系コマンド <a id="1"></a>
### 1.1 ネットワーク系コマンドいろいろ <a id="1-1"></a>
#### 【Ping】
　TCP/IPネットワーク上のPCやネットワーク機器が正常に接続されているかどうか、ネットワークの疎通状況を確認するためのコマンド。これを足がかりに、ほかのコマンドなどで障害状況などをドリルダウンする。
　pingは、IPのエラーメッセージなどを返すプロトコル「ICMP」（Internet Control Message Protocol）を使用して、ネットワーク上のホストの疎通状況やエラーの内容を確認するコマンドだ。
（@IT）

例：www.yahoo.co.jpにPingで疎通確認
```sh
$ ping www.yahoo.co.jp
PING edge12.g.yimg.jp (182.22.25.252): 56 data bytes
64 bytes from 182.22.25.252: icmp_seq=0 ttl=56 time=42.900 ms
64 bytes from 182.22.25.252: icmp_seq=1 ttl=56 time=18.487 ms
64 bytes from 182.22.25.252: icmp_seq=2 ttl=56 time=20.601 ms
64 bytes from 182.22.25.252: icmp_seq=3 ttl=56 time=35.646 ms
 ：
```

#### 【Tracroute】
　ホスト間の経路情報を取得するためのコマンド。tracertはWindowsのコマンドで、tracerouteはUNIXのコマンド。
　tracert / tracerouteコマンドは、pingコマンドで疎通が確認できなかったホストに対して、経路上のルータなどに障害が発生していないか確認するために用いる。
（@IT）

例：203.141.47.14までの経路を調べる（IPアドレスはダミー）
```sh
$ traceroute 203.141.47.14
traceroute to 203.141.47.14 (203.141.47.14), 64 hops max, 52 byte packets
 1  192.168.11.1 (192.168.11.1)  5.605 ms  1.068 ms  0.895 ms
 2  192.168.10.1 (192.168.10.1)  2.347 ms  22.958 ms  1.623 ms
 3  softbank221119210223.bbtec.net (221.119.210.223)  4.339 ms  4.451 ms  4.430 ms
 4  softbank221119210225.bbtec.net (221.119.210.225)  4.476 ms  26.019 ms  4.370 ms
 5  softbank221119210205.bbtec.net (221.119.210.205)  7.539 ms  36.646 ms  10.870 ms
 6  10.0.191.242 (10.0.191.242)  20.258 ms
    10.0.191.246 (10.0.191.246)  13.258 ms
    10.0.191.242 (10.0.191.242)  43.866 ms
 7  101.102.204.242 (101.102.204.242)  16.745 ms  43.916 ms  19.529 ms
 8  203.141.47.140 (203.141.47.140)  43.773 ms  36.375 ms  17.851 ms
 9  203.141.47.14 (203.141.47.14)  26.045 ms  21.747 ms  28.915 ms
```

#### 【Telnet】
　ネットワーク仮想端末プロトコル。ワークステーションからネットワークホストへ、ローカルと同じようにアクセスできるようにするアプリケーション層のプロトコル。RFC854で定義されている。
（@IT）

例：telnetで server1 に接続し、コマンドを実行
```sh
$ telnet server1
Trying 172.22.0.2...
Connected to server1.
Escape character is '^]'.

Kernel 4.19.121-linuxkit on an x86_64
server1 login: guest
Password: 
$ date
Sat Jan  2 17:03:09 JST 2021
$ id
uid=1000(guest) gid=1000(guest) groups=1000(guest)
```

#### 【Netcat】
Netcatは、Unix系OSコマンドラインアプリケーションの一つ。TCPやUDPのパケットを読み書きするバックエンドとして機能するツールで、ネットワークを扱う万能ツールとして知られる。オリジナル版より機能的に優位な派生・互換ツールが開発され、用いられている。
(Wikipedia)

例(Server1) ：7779ポートでTCPをリッスン
```sh
$ nc -kl 7779
Hello, I am server2   #接続してきた端末からの入力情報が表示される
 :
```

例(Server2) ：server1の7779ポートに接続し、文字列送信
```sh
$ nc server1 7779
Hello, I am server2   #Enter入力でServer1で左記文字列が表示される
^C
```

#### 【Nmap】
　ネットワークの調査や監査などに使用するオープンソースのツール。ネットワーク上の利用可能なホストやホストが実行しているOS名とバージョンを確認するなど、ネットワークの状況をリモートからもスキャンできる。
　nmapの代表的な使用方法に、ポートスキャンがある。例えば、「nmap target」コマンドではターゲットのホスト上にある1660個近くのTCPポートをすべてスキャンする。そして、ポートの状態をopen（開いている）やclosed（閉じている）、filtered（フィルタリングされている）など6種類に分類し、一覧表示する。
（@IT）

例：server1へのTCPポートスキャン
```sh
$ nmap server1
Starting Nmap 7.70 ( https://nmap.org ) at 2021-01-02 17:12 JST
Nmap scan report for server1 (172.22.0.2)
Host is up (0.00051s latency).
rDNS record for 172.22.0.2: ef8d84c6dba7
Not shown: 997 closed ports
PORT     STATE SERVICE
7/tcp    open  echo
23/tcp   open  telnet
7777/tcp open  cbt

Nmap done: 1 IP address (1 host up) scanned in 0.16 seconds
```

#### 【Lsof】
「lsof」はオープンしているファイルを一覧表示するコマンドです。
（@IT）

例：自ホストの7771ポートのオープン状況を調査
```sh
$ lsof | grep 7771
xinetd     35  root    6u     IPv6             627303      0t0        TCP *:7771 (LISTEN)
```



### 1.2 xinetdで簡易サービスを作ってみる <a id="1-2"></a>

#### (1)xinetdをインストール(CentOS 8)
 ```
 # dnf -y install xinetd
 ```

#### (2)サービス本体を作成
/tmp/myecho.sh
```sh
#!/usr/bin/env sh
while read i ; do
  echo -e "server1 now received => ${i}"
done
```

#### (3)xinetdにサービスを設定
/etc/xinetd.d/myecho-stream
```sh
service myecho-stream
{
        disable         = no
        id              = myecho-stream
        type            = UNLISTED
        wait            = no
        socket_type     = stream
        user            = root
        server          = /tmp/myecho.sh
        port            = 7771
        flags           = REUSE
        log_on_failure  += USERID
        per_source      = UNLIMITED
}
```

#### (4)xinetdを再起動
```
# systemctl restart xinetd
```


#### (5)別ホストから接続
```sh
$ nc server1 7771
Hello, World.                           # Enter入力で左記文字列を送信
server1 now received => Hello, World.   # 上記入力により左記文字列の応答が返る
```

## 2. C#開発環境 on Mac <a id="2"></a>

思いつき企画。中途半端に終ってしまったので参考サイト参照

### 2.1 参考サイト <a id="2-1"></a>
* [VSCodeでC#開発環境整えちゃう（グッバイVisual Studio）](https://ascii.jp/elem/000/004/038/4038170/)
* [macOS に .NET をインストールする](https://docs.microsoft.com/ja-jp/dotnet/core/install/macos/)
