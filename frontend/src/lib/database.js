import axios from "axios";

const baseUrl = "http://localhost:3020/api";

export const tagihan = async() => {
    return await axios.get(`${baseUrl}/tagihan`);
}
