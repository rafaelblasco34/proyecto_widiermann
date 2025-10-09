    import { collection, getDocs } from "firebase/firestore";

    const col = collection(db, "usuarios");
    const snap = await getDocs(col);
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    console.log(data); 