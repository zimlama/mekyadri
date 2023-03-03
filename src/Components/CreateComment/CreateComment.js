import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  FormControl,
  Flex,
  Textarea,
  Grid,
  Select,
  Button,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { createComments } from "../../Redux/actions/comments";
import { getAllHotels } from "../../Redux/actions/hotels";

function CreateComent() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    idHotels: "",
    rating: 0,
    comment: "",
    userEmail: "",
  });

  const { user, isAuthenticated } = useAuth0();

  const hotels = useSelector((state) => state.hotels);

  useEffect(() => {
    dispatch(getAllHotels());
  }, [dispatch]);

  function handleInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  let email = "";

  if (isAuthenticated) {
    email = user.email;
  }

  function handleSubmit() {
    if (email.length > 0) {
      setInput({
        ...input,
        userEmail: email,
      });
    }
    input.rating = parseInt(input.rating);
    dispatch(createComments(input));
    console.log(input);
  }

  return (
    <Box>
      <Heading color="teal" mt="20px" mb="40px">
        How was your experience with us ?
      </Heading>
      <Text as="i" fontSize="md" mr="39%" ml="80px">
        Our clients deserve the best, that`s why we want to know about your
        experience with us
      </Text>
      <Grid templateColumns="1fr 1fr">
        <Flex alignItems="center" justifyContent="center">
          <Box mt="20px">
            <Card
              alignItems="center"
              justifyContent="center"
              mt="20px"
              ml="40px"
              mb="20px"
            >
              <CardBody>
                <FormControl isRequired onSubmit={(e) => handleSubmit(e)}>
                  <Select
                    onChange={(e) => handleInput(e)}
                    mt="20px"
                    ml="25px"
                    width="60%"
                    border="solid"
                    color="teal"
                    name="idHotels"
                  >
                    <option value={0}>Select a Hotel</option>
                    {hotels &&
                      hotels?.map((e) => (
                        <option key={e.idHotels} value={e.idHotels}>
                          {e.name}
                        </option>
                      ))}
                  </Select>

                  <Select
                    onChange={(e) => handleInput(e)}
                    width="70%"
                    mt="30px"
                    ml="26px"
                    mb="40px"
                    border="solid"
                    color="teal"
                    name="rating"
                  >
                    <option>We want you to rate us!</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </Select>
                  <Text mt="60px" mr="76%" as="i">
                    Your Review
                  </Text>
                  <Textarea
                    name={"comment"}
                    onChange={(e) => handleInput(e)}
                    ml="20px"
                    mt="20px"
                    type="textarea"
                    border="solid"
                    color="teal"
                    width="90%"
                    placeholder="Write your review here!"
                    rows={4}
                  />
                  <Button
                    mt="30px"
                    type="submit"
                    color="teal"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </Button>
                </FormControl>
              </CardBody>
            </Card>
          </Box>
        </Flex>
      </Grid>
      <Box> </Box>
    </Box>
  );
}

export default CreateComent;
