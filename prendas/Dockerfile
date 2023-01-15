FROM python:3.8-slim-buster

WORKDIR /usr/src/app

COPY /requirements.txt ./
ENV  PYTHONPATH=/usr/app/app  

ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

RUN pip3 install --no-cache-dir --upgrade pip \
&& pip3 install --no-cache-dir -r requirements.txt

COPY . .
#RUN python app/prestart.py

EXPOSE 3000

