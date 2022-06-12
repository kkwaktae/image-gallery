# image-gallery
* 이미지를 검색하고 보관할 수 있는 앱입니다.


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

### 1. 최초 실행 화면(진행중) / react-router-dom 활용
* 왼쪽 상단의 pexel logo 클릭 시 공식 홈페이지로 이동합니다.
* 오른쪽 상단의 Main / Favorite tab을 클릭 시 각 페이지로 화면이 전환됩니다.
* Main 페이지는 검색 기능을 수행하는 초기 화면입니다.
* Favorite 페이지는 즐겨찾기 한 이미지들을 따로 보관하는 화면입니다.

![image](https://user-images.githubusercontent.com/89800985/173222624-73f87c54-fa85-429f-b136-02bfa93006a4.png)




### 2. 키워드 검색 및 스크롤 기능 / FormEvent 및 Intersection Observer(무한 스크롤) 활용
* Search 버튼을 클릭하거나 'Enter' key 입력 시 검색 기능이 작동하도록 구현했습니다.
* API response data의 alt를 기반으로 검색 기능을 구현했기 때문에, 영어로만 검색이 가능합니다.
* 빈 칸 입력 후 Search 시 최초 화면이 나타나도록 구현했습니다.
* 이미지 리스트 형태로 검색 결과가 나타나도록 구현했습니다.

![image](https://user-images.githubusercontent.com/89800985/173227309-bb442fc2-b518-4bd6-8a05-2703abe8fcfa.png)




### 3. 이미지 클릭 시 상세 정보 화면 / Modal Portal 활용
* 썸네일 이미지보다 큰 사이즈의 이미지를 보여줍니다.
* 우측 상단에 총 3가지 기능을 하는 아이콘을 만들었습니다. (즐겨찾기, 상세정보 보기, 닫기)
* 닫기 아이콘을 클릭하거나 Modal 외부 영역을 클릭하면 Modal이 닫힙니다.

![image](https://user-images.githubusercontent.com/89800985/173227390-a2c2d76d-d35a-4320-a103-9b65b2e8cba8.png)




### 4. 즐겨찾기 아이콘 클릭 시(진행중) / dataset 및 localStorage 활용  
* 아이콘 클릭 시 아이콘 색상이 변경되며, 해당 이미지 정보를 localStorage에 저장한 뒤, Favorite 페이지에서 리스트화 합니다.

![image](https://user-images.githubusercontent.com/89800985/173227400-43cbc222-336b-4bd7-b2c7-1de436c426a6.png)




### 5. 이미지 정보 더보기 아이콘 클릭 시
* 아이콘 클릭 시 해당 이미지의 원본 주소, 작가명, 작가의 주소에 대한 정보가 보여집니다.
* 아이콘 재클릭 시 정보를 다시 숨길 수 있습니다.

![image](https://user-images.githubusercontent.com/89800985/173227438-0ebc54f4-202c-4757-bb8d-8ad515661180.png)




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

## 어려웠던 점, 배운 점, 그리고 느낀 점
