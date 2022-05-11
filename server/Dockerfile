FROM node:16.14.2

WORKDIR /nest

# package.json을 절대경로 /nest 에
COPY package.json /nest 
RUN npm install

# 모든 파일을 절대경로 /nest 에
COPY . /nest 

# 포트 노출 설정. 실제 포트 설정은 docker run -p 들어갈포트:열린포트(EXPOSE) 이미지
EXPOSE 4000

# 이미지가 생성될때가 아닌 컨테이너가 시작될 때 실행
CMD npm run start:dev 