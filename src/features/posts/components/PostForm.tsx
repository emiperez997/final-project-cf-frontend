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

const filter = createFilterOptions();

export function PostForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [choosenCategories, setChoosenCategories] = useState<string[]>([]);
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
    console.log(data);
    console.log(choosenCategories);
  };

  const handleCategoriesChange = (_: any, value: any) => {
    if (choosenCategories.some((category) => category === value.name)) {
      toast.error("La categoría ya ha sido seleccionada");
      return;
    }

    if (typeof value === "string") {
      setChoosenCategories((prev) => [...prev, value]);
    } else if (value && value.inputValue) {
      setCategories([...categories, { name: value.inputValue }]);
    } else {
      setChoosenCategories(value);
    }
  };

  return (
    <Container maxWidth="md">
      <Card
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}
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
