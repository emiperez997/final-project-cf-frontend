import {
  Autocomplete,
  Button,
  Card,
  Container,
  createFilterOptions,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formStyle } from "../../../theme/constants";
import { LoadingButton } from "@mui/lab";
import { NavLink } from "react-router-dom";
import { CategoryApi } from "../../../api/categories.api";
import { toast } from "react-toastify";
import { Post, PostCreate } from "../types";
import { UserApi } from "../../../api/users.api";
import { PostApi } from "../../../api/posts.api";

const filter = createFilterOptions();

interface Category {
  createdAt: Date;
  id: string;
  name: string;
  updatedAt: string;
}

interface AddCategory {
  inputValue: string;
  name: string;
}

export function PostForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [choosenCategories, setChoosenCategories] = useState<
    (Category | AddCategory)[]
  >([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true);
      try {
        const categories = await CategoryApi.getCategories();
        setCategories(categories);
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const onSubmit = async (data: any) => {
    const post: any = {
      title: data.title,
      description: data.description,
      content: data.content,
      categories: choosenCategories.map((category) => {
        const { name, inputValue } = category;
        return inputValue ? inputValue : name;
      }),
    };

    console.log(post);
  };

  const handleCategoriesChange = (
    _: any,
    value: (Category | AddCategory)[]
  ) => {
    setChoosenCategories(value);
  };

  return (
    <Container maxWidth="md">
      <Card
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2,
          width: {
            xs: 350,
            md: 600,
          },
        }}
      >
        <TextField
          {...register("title")}
          type="text"
          label="Titulo"
          variant={formStyle}
        />
        <TextField
          {...register("description")}
          type="text"
          label="Descripción"
          variant={formStyle}
        />

        <TextField
          {...register("content")}
          type="text"
          label="Contenido"
          variant={formStyle}
          multiline
          rows={6}
        />

        {categories.length > 0 && (
          <Autocomplete
            multiple
            id="categories"
            options={
              categories.length > 0
                ? categories
                : [{ name: "Cargando categorías..." }]
            }
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              const isExisting = options.some(
                (option) => inputValue === option.name
              );

              if (inputValue !== "" && !isExisting) {
                filtered.push({
                  inputValue,
                  name: `Agregar "${inputValue}"`,
                });
              }

              return filtered;
            }}
            getOptionLabel={(option) => option.name}
            onChange={handleCategoriesChange}
            renderInput={(params) => (
              <TextField {...params} variant={formStyle} label="Categorias" />
            )}
          />
        )}

        <LoadingButton type="submit" variant="contained" loading={isLoading}>
          Crear Post
        </LoadingButton>
      </Card>
    </Container>
  );
}
