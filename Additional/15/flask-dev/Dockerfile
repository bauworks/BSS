# base image
FROM python:3.8.5

ARG project_dir

# workdir にファイル等追加
ADD requirements.txt $project_dir

# workdir
# なければ新規作成
WORKDIR $project_dir

# upgrade pip
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
