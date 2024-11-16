import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

const MessageBoard: React.FC<any> = ({ messages }) => {
  return (
    <Box sx={{ margin: "0 auto", padding: 2, marginTop: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Message Board
      </Typography>
      {messages.map((message: any) => (
        <Card key={message._id} sx={{ marginBottom: 2, width: 550 }}>
          <CardContent>
            <Typography variant="h6" component="div">
              {message.email}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {message.message}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MessageBoard;
