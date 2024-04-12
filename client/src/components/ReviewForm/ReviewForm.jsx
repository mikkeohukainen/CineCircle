import { useForm } from "@mantine/form";
import {
  Button,
  TextInput,
  Textarea,
  Rating,
  Box,
  InputLabel,
  Input,
  Fieldset,
} from "@mantine/core";

export default function ReviewForm({ onSubmit }) {
  const form = useForm({
    initialValues: {
      title: "",
      review: "",
      rating: 0,
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Textarea
        placeholder="Write your review here"
        required
        {...form.getInputProps("review")}
        autosize
        resize="vertical"
        minRows={5}
        maxLength={500}
        maxRows={10}
      />
      <Input.Wrapper mt={16} withAsterisk label="Your rating">
        <Rating {...form.getInputProps("rating")} size="lg" />
      </Input.Wrapper>
      <Box mt={16} align="right">
        <Button type="submit">Submit review</Button>
      </Box>
    </form>
  );
}
