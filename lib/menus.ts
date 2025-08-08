export type MealTime = "lunch" | "dinner"

export type MenuItem = {
  id: string
  name: string
  imageUrl: string
}

// Expanded lunch with more Korean dishes and pho
export const lunchMenus: MenuItem[] = [
  { id: "bibimbap", name: "비빔밥", imageUrl: "/images/foods/bibimbap.png" },
  { id: "kimbap", name: "김밥", imageUrl: "/images/foods/kimbap.png" },
  { id: "kimchijjigae", name: "김치찌개", imageUrl: "/images/foods/kimchijjigae.png" },
  { id: "doenjangjjigae", name: "된장찌개", imageUrl: "/images/foods/doenjangjjigae.png" },
  { id: "gukbap", name: "국밥", imageUrl: "/images/foods/gukbap.png" },
  { id: "kalguksu", name: "칼국수", imageUrl: "/images/foods/kalguksu.png" },
  { id: "sujebi", name: "수제비", imageUrl: "/images/foods/sujebi.png" },
  { id: "tteokbokki", name: "떡볶이", imageUrl: "/images/foods/tteokbokki.png" },
  { id: "naengmyeon", name: "냉면", imageUrl: "/images/foods/naengmyeon.png" },
  { id: "ramen", name: "라멘", imageUrl: "/images/foods/ramen.png" },
  { id: "sushi", name: "초밥", imageUrl: "/images/foods/sushi.png" },
  { id: "pho", name: "쌀국수", imageUrl: "/images/foods/pho.png" },
  { id: "jjajangmyeon", name: "짜장면", imageUrl: "/images/foods/jjajangmyeon.png" },
  { id: "jjamppong", name: "짬뽕", imageUrl: "/images/foods/jjamppong.png" },
  { id: "tonkatsu", name: "돈까스", imageUrl: "/images/foods/tonkatsu.png" },
  { id: "katsucurry", name: "카레 가츠", imageUrl: "/images/foods/katsucurry.png" },
  { id: "salad", name: "샐러드", imageUrl: "/images/foods/salad.png" },
  { id: "burger", name: "버거", imageUrl: "/images/foods/burger.png" },
]

// Dinner set
export const dinnerMenus: MenuItem[] = [
  { id: "samgyeopsal", name: "삼겹살", imageUrl: "/images/foods/samgyeopsal.png" },
  { id: "chicken", name: "치킨", imageUrl: "/images/foods/chicken.png" },
  { id: "jjigae", name: "찌개", imageUrl: "/images/foods/jjigae.png" },
  { id: "pasta", name: "파스타", imageUrl: "/images/foods/pasta.png" },
  { id: "pizza", name: "피자", imageUrl: "/images/foods/pizza.png" },
  { id: "gopchang", name: "곱창", imageUrl: "/images/foods/gopchang.png" },
  { id: "dakgalbi", name: "닭갈비", imageUrl: "/images/foods/dakgalbi.png" },
  { id: "jokbal", name: "족발", imageUrl: "/images/foods/jokbal.png" },
]

export function getMenuPool(mealTime: MealTime): MenuItem[] {
  return mealTime === "dinner" ? dinnerMenus : lunchMenus
}
