
import carb from '../resources/carb_ingredient.png'
import protein from '../resources/protein_ingredient.png'

const getImg = (key) => {
    let img;
    switch (key){
      case 'carbohydrate' :
        img = carb;
      case 'protein' :
        img = protein;
    //   case 'vegetable' :
    //     imgSrc = "../resources/vege_ingredient.png";
    //   case 'fat' :
    //     imgSrc = "../resources/fat_ingredient.png";
    //   case 'fruit' :
    //     imgSrc = "../resources/fruit_ingredient.png";
    }
    return imgSrc;
  }

  export default getImg;