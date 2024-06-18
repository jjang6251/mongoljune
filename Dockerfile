# Node.js 이미지 사용
FROM node:21

# 앱 디렉토리 생성
WORKDIR /usr/src/app

# 패키지 파일 복사
COPY package*.json ./

# 패키지 설치
RUN npm install

# 소스 코드 복사
COPY . .

ARG OPENAI_API_KEY
ARG SECRET_KEY
ARG DB_HOST
ARG DB_USER
ARG DB_PASSWORD
ENV DB_PASSWORD $DB_PASSWORD
ENV DB_USER $DB_USER
ENV DB_HOST $DB_HOST
ENV SECRET_KEY $SECRET_KEY
ENV OPENAI_API_KEY $OPENAI_API_KEY

# 앱 실행
CMD [ "npm", "start" ]