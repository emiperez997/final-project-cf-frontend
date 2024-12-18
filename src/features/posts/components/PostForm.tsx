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
}

export function PostForm(
  { postId }: { postId?: string | undefined } = { postId: undefined }
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [choosenCategories, setChoosenCategories] = useState<
    (Category | AddCategory)[]
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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

    async function fetchPost() {
      if (postId) {
        try {
          const post: Post = await PostApi.getPost({ id: postId });
          console.log(post);

          reset({
            title: post.title,
            description: post.description,
            content: post.content,
          });

          setChoosenCategories(
            post.categories.map(({ category }) => ({
              name: category.name,
              inputValue: category.name,
            }))
          );
        } catch (error: any) {
          console.error(error);
        }
      }
    }

    fetchCategories();
    fetchPost();
  }, []);

  const onSubmit = async (data: any) => {
    const post: PostCreate = {
      title: data.title,
      description: data.description,
      content: data.content,
      categories: choosenCategories.map((category) => {
        if ("inputValue" in category) {
          return category.inputValue;
        }

        return (category as Category).name;
      }),
    };

    setIsLoading(true);

    try {
      if (postId) {
        await PostApi.updatePost({ id: postId, post });
        toast.success("Post actualizado exitosamente");
        return;
      }

      await PostApi.createPost({ post });
      toast.success("Post creado exitosamente");
    } catch (error: any) {
      console.error(error);
      toast.error("Ocurrió un error al crear el post");
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const handleCategoriesChange = (
    _: any,
    value: (Category | AddCategory)[]
  ) => {
    setChoosenCategories(value);
  };

  return (
    <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center" }}>
      {!isLoading && (
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
              value={choosenCategories}
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
            {postId ? "Editar" : "Crear"} Post
          </LoadingButton>
        </Card>
      )}
    </Container>
  );
}
