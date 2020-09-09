# base image
FROM python:3.8.5

ARG project_dir=/work/

# workdir にファイル等追加
ADD run.py $project_dir
ADD requirements.txt $project_dir

# workdir
# なければ新規作成
WORKDIR $project_dir

# upgrade pip
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# port
EXPOSE 5000

ENV PYTHONPATH "${PYTHONPATH}:/code/"
ENV FLASK_APP "/run.py"