# image-gallery

## 배포 링크
* [Vercel](https://image-gallery-dusky.vercel.app/)

## Dependencies

<span><img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/stylelint-263238?style=flat-square&logo=stylelint&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/ReactRouter-CA4245?style=flat-square&logo=ReactRouter&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/recoil-FFFF00?style=flat-square&logo=recoil&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/classnames-000000?style=flat-square&logoColor=white"/></span>

## 실행 화면과 기능
* 최초 실행 화면
![image](https://user-images.githubusercontent.com/89800985/173222624-73f87c54-fa85-429f-b136-02bfa93006a4.png)


#### 데이터 객체 타입
```ts
interface Src {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: Src;
  liked: boolean;
  alt: string;
}

interface Response {
  page: number;
  per_page: number;
  photos: Photo[];
  next_page: string;
}

```

#### 검색 조건
* API response data의 alt를 기반으로 검색 기능을 구현했기 때문에, 영어로만 검색이 가능합니다.

#### 검색 결과
* 리스트 형태로 검색 결과가 나타나도록 했습니다

## 어려웠던 점, 배운 점, 그리고 느낀 점
