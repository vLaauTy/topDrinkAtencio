import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CharacterDetail.css";
import { Link } from "react-router-dom";
import CharacterCardDetail from "../CharacterCartDetail/CharacterCardDetail";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
} from 'firebase/firestore';

import { db } from "../../firebase/FirebaseConfig";


function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const CharacterDetail = () => {
  const { id } = useParams();

  const [item, setItem] = useState([]);
  useEffect(() => {
    const getItem = async () => {
      const q = query(
        collection(db, "productos"),
        where(documentId(), "==", id)
      );
      const querySnapshot = await getDocs(q);
      const docs = [];

      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setItem(docs);
    };
    getItem();
  }, [id]);

  return (
    <div>
      <div className="Characterdetail">
        {item.map((char) => {
          return (
            <div key={char.id}>
              <h2>{capitalizarPrimeraLetra(char.name)}</h2>
              <Link
                to={`/detail/${char.id}`}
                style={{ textDecoration: "none" }}
              >
                <CharacterCardDetail item={char} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterDetail;
