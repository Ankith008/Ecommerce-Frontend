import React from "react";
import "../css/ProductProfile.css";
import pic1 from "../images/1.jpg";
import pic2 from "../images/2.jpg";
import pic3 from "../images/3.jpg";
import pic4 from "../images/4.jpg";
import pic5 from "../images/5.jpg";

export default function ProductProfile() {
  const hlo = ["S", "A", "M", "P", "L", "E"];
  const pictures = [pic1, pic2, pic3, pic4, pic5];
  return (
    <div className="cardouter">
      <div className="cardleft">
        <div className="productimage">
          {pictures.map((ele) => {
            return (
              <div className="images">
                <img src={ele} className="image" alt="product" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="cardright">
        <h1>Product Name</h1>
        <div className="productsize">
          {hlo.map((ele) => {
            return (
              <div className="content">
                <p>{ele}</p>
              </div>
            );
          })}
        </div>
        <div className="productprice">
          <p className="price">Price: $100</p>
        </div>
        <div className="productdescription">
          <p className="descp">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quae
            perspiciatis culpa. Nesciunt architecto id excepturi impedit aliquid
            vitae tenetur, alias suscipit consequatur perferendis velit maxime
            quibusdam tempora provident! Earum corrupti fuga debitis
            exercitationem rerum provident praesentium consequuntur, totam
            dolorum, laborum sint a repellat architecto culpa. Rerum doloribus
            labore maiores laborum ipsum sequi distinctio nesciunt totam quae
            ducimus, neque fugiat architecto adipisci, velit voluptas
            perferendis ullam nisi blanditiis. Pariatur quaerat numquam velit,
            labore magni sunt maxime doloremque maiores architecto officia ipsam
            quibusdam corporis consectetur, dolores, debitis necessitatibus!
            Maiores qui eius delectus ratione repellat eos excepturi? Sit a,
            iure quae voluptate libero iste itaque eum dolorem accusantium
            fugiat placeat, necessitatibus adipisci ducimus esse delectus dicta
            earum. Odit architecto repudiandae officiis, nisi nam cum atque
            quasi omnis cumque. Dolorem quidem deserunt iure fugiat repellat ea
            sed ducimus delectus recusandae commodi? Cum eius nisi corporis, ab,
            perspiciatis deserunt corrupti hic veritatis, voluptatibus excepturi
            dolore nemo dignissimos vitae vel. Fuga, eligendi consectetur.
            Quidem cupiditate id culpa itaque. Labore nesciunt esse
            necessitatibus! Natus ab ullam culpa ad? Quisquam ipsum eaque, sequi
            quia alias libero illum commodi. Excepturi non necessitatibus
            similique tenetur maxime corporis quod nostrum quam, perferendis
            unde laborum iusto, architecto, ex voluptatibus libero quaerat.
          </p>
        </div>
        <div className="productbuttons">
          <button className="addtocart">Add to Cart</button>
          <button className="buynow">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
