import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomButton from "../CustomButton";
import EditMenuDialog from "../EditMenuPopup";

export interface MenuCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string[];
  handleDelete?: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({
  name,
  description,
  price,
  image,
  category,
  handleDelete,
}) => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<MenuCardProps>({
    name,
    description,
    price,
    image,
    category,
    handleDelete,
  });

  const handleSave = (updatedItem: Omit<MenuCardProps, "id">) => {
    setItem(updatedItem);
    setOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: "250px",
          textAlign: "center",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "250px",
            height: "340px",
          }}
        >
          <img
            height="110"
            src={image}
            alt={name}
            style={{ marginTop: 15, borderRadius: 8 }}
          />
          <CardContent sx={{ textAlign: "left" }}>
            <Typography variant="h6">{item.name}</Typography>
            <Divider sx={{ backgroundColor: "orange", marginY: 1 }} />
            <Typography
              sx={{ fontSize: 16, fontWeight: "bold", mt: -0.5, mb: 0.5 }}
            >
              Rs. {item.price}.00
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "0.8rem", mt: -0.5 }}>
              {description}
            </Typography>
            <Typography variant="body2">
              {item.category.map((cat, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: "#454141",
                    color: "#fff",
                    padding: "3px 8px",
                    borderRadius: "5px",
                    marginRight: "5px",
                    display: "inline-block",
                    opacity: 0.5,
                    fontSize: "0.7rem",
                    marginTop: 2,
                  }}
                >
                  {cat}
                </span>
              ))}
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
            >
              <CustomButton
                label="Edit Details"
                onClick={() => setOpen(true)}
              />
              <IconButton
                aria-label="delete"
                onClick={handleDelete}
                sx={{
                  color: "#716b6b",
                  padding: 1,
                  backgroundColor: "#d5d1d1",
                  "&:hover": {
                    color: "darkred",
                    backgroundColor: "#d5d1d1",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Box>
      </Card>
      <EditMenuDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        item={{ name, description, price, image, category }}
      />
    </>
  );
};

export default MenuCard;
