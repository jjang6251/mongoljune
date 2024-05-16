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

# 앱 실행
CMD [ "npm", "start" ]