import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CategoryDetail.css";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import CharacterCard from "../../components/CharacterCard/CharacterCard";

const CategoryDetail = () => {
  const { category } = useParams();


  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const [item, setItem] = useState([]);
  useEffect(() => {
    const getItem = async () => {
      const q = query(
        collection(db, "productos"),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setItem(docs);
    };
    getItem();
  }, [category]);

  return (
    <div>
      <h1>{capitalizarPrimeraLetra(category)}</h1>
      <div className="grid">
        {item.map((char) => {
          return (
            <div key={char.id}>
              <Link
                to={`/detail/${char.id}`}
                style={{ textDecoration: "none" }}
              >
                <CharacterCard data={char} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryDetail;
