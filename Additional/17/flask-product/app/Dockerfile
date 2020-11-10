# base image
FROM python:3.8.5

ARG project_dir=/var/www/

# workdir にファイル等追加
COPY requirements.txt $project_dir

# workdir
WORKDIR $project_dir

# upgrade pip
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

CMD ["uwsgi","--ini","/var/www/uwsgi.ini"]