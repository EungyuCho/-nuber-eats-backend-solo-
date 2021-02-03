# Nuber Eats Backend

![subscription](https://github.com/EungyuCho/nuber-eats-backend/blob/master/docs/images/preview.gif)

## TeckStack

- ![title](https://img.shields.io/badge/-TypeScript-007ACC?&logo=TypeScript&logoColor=white)
- ![title](https://img.shields.io/badge/-NestJS-E0234E?&logo=NestJS&logoColor=white)
- ![title](https://img.shields.io/badge/-Jest-C21325?&logo=jest&logoColor=white)
- ![title](https://img.shields.io/badge/-NPM-CB3837?&logo=NPM&logoColor=white)
- ![title](https://img.shields.io/badge/-Heroku-430098?&logo=Heroku&logoColor=white)
- ![title](https://img.shields.io/badge/-ESLint-4B32C3?&logo=ESLint&logoColor=white)
- ![title](https://img.shields.io/badge/-Prettier-F7B93E?&logo=Prettier&logoColor=white)
- ![title](https://img.shields.io/badge/-TypeORM-e93524)

# About Nuber Eats Backend
## Common Features
- 계정 생성(password hash with bcrypt)
- 로그인(save token in local storage)
- 회원정보 수정
- 이메일 인증(will be verify user email)
- 프로필 확인(개인 정보, 결제정보, 주문정보, 이메일 인증여부 등등)
- 전체 레스토랑 리스트
  > 프로모션 되어있는 가게의 경우 우선순위가 높음
  > 
    > 프로모션은 매일 12시에 프로모션 기한을 확인해서 지난 가게의 경우 프로모션 상태를 지워 줌(Cron)
- 레스토랑 
- 전체 카테고리
- 레스토랑 검색
- 카테고리
- 전체 주문 확인
- 주문 확인
- 주문 현재 상태 확인(Subscription)

## Client
- 음식 주문

## Owner
- 매장 생성
- 매장 정보 수정
- 매장 삭제
- 매장 음식 목록 추가
- 매장 음식 수정
- 매장 음식 삭제
- 주문 시 주문 정보 수신(Subscription)
- 가게 프로모션 신청

## driver
- 음식 만들어 졌을 시 픽업 신청(Subscription)
- 음식 픽업, 배달 완료 시 주문 상태 업데이트(Subscription)