import React from "react";
import { useEffect, useState } from "react";
import CharacterCard from "../CharacterCard/CharacterCard";
import "./CharacterList.css";
import { Link } from "react-router-dom";
import { db } from "../../firebase/FirebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";

const CharacterList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const q = query(collection(db, "productos"));
      const querySnapshot = await getDocs(q);
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setItems(docs);
    };
    getItems();
  }, []);

  return (
    <div>
      <div className="grid">
        {items.map((data) => {
          return (
            <Link
              to={`/detail/${data.id}`}
              key={data.id}
              style={{ textDecoration: "none" }}
            >
              <CharacterCard data={data}></CharacterCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterList;
