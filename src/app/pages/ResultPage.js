import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ApiCall from "../api/ApiCall";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


export const ResultPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    const response = await ApiCall.getResultList();
    if (response.status === 200 && response && response.data) {
      console.log(response.data);
      setResults(response.data);
    }
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
            justifyContent: "space-evenly",
          }}
        >
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 900, midHeight: 600 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Kullanıcı Adı</TableCell>
                  <TableCell align="right">Sınav Adı</TableCell>
                  <TableCell align="right">Doğru Sayısı</TableCell>
                  <TableCell align="right">Toplam Soru Sayısı</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((row) => (
                  <TableRow
                    key={row.userName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.userName}
                    </TableCell>
                    <TableCell component="th" align="right" scope="row">
                      {row.quizName}
                    </TableCell>
                    <TableCell align="right">
                      {row.correctAnswerCount}
                    </TableCell>
                    <TableCell align="right">{row.questionCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
};
export default ResultPage;
