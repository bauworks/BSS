from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# x. Chrome の起動オプションを設定する
options = webdriver.ChromeOptions()
#options.add_argument('--headless')

# x. ブラウザの新規ウィンドウを開く
print('connectiong to remote browser...')
driver = webdriver.Remote(
    command_executor='http://localhost:4444/wd/hub',
    desired_capabilities=options.to_capabilities(),
    options=options,
)
driver.implicitly_wait(10)

# 1. Yahoo!JAPAN のTOPページにアクセスする
driver.get('https://www.yahoo.co.jp')
print('1. current_url : ' + driver.current_url)

# 2. 「ニュース」に表示されている記事の上から３番目のページに移動する
driver.find_element(By.XPATH, '//*[@id="tabpanelTopics1"]/div/div[1]/ul/li[3]/article/a/div/div/h1/span').click()

# 3. 移動した記事の右に表示されているトピックスの２番目のエレメントを取得
article_links = driver.find_elements(By.XPATH, '//*[@id="yjnFixableArea"]/div/section[1]/ul/li[2]/a')

# 3.1. 取得したエレメントのテキストを表示 
next_title = article_links[0].text
print(next_title)

# 3.2. 取得したエレメントのリンクを表示
next_link = article_links[0].get_attribute('href')
print(next_link)

# 3.3. 取得したエレメントのリンクにアクセス
driver.get(next_link)

# x. 10秒経ったらブラウザを終了する
time.sleep(10)
driver.quit()
