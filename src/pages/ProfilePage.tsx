import { Carousel, Embla } from "@mantine/carousel";
import {
  Button,
  Container,
  Progress,
  Title,
  Grid,
  Card,
  Group,
  Modal,
  Center,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import AppFooter from "../components/AppFooter";
import {
  DatePicker,
  DateRangePicker,
  DateRangePickerValue,
} from "@mantine/dates";
import MoodDonut from "../components/MoodDonut";
import AppContainer from "../components/AppContainer";
import ProfilePageImage from "../resources/ProfilePageImage.jpg";
import AppHeader from "../components/AppHeader";
import { useQuery } from "@tanstack/react-query";
// import { fetchEntries} from "../services/entry.service";
import { Entry, EntryResults } from "../types/entry.types";
import { Profile } from "../types/profile.types";
import { AuthContext } from "../context/auth.context";
import { getEntries, getEntry } from "../services/entry.service";
import { profile } from "console";

// import { fetchEntries } from "../services/entry.service";

export default function ProfilePage() {
  const [userName, setUserName] = useState();
  const { user } = useContext(AuthContext);
  const [showEntry, setShowEntry] = useState(false);
  const [closeEntry, setCloseEntry] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<Entry>({} as Entry);
  const [value, setValue] = useState<DateRangePickerValue>([
    new Date(2022, 9, 1),
    new Date(2022, 9, 30),
  ]);

  const entries = useQuery(
    ["entries", user?._id],
    async () => await getEntries(user?._id as string)
  );
  // const entries = useQuery(["entries"], fetchEntries);

  useEffect(() => {}, []);
  //Started setting up useEffect here

  function showEntryDetails(entry: Entry) {
    setSelectedEntry(entry);
    setShowEntry(true);
  }

  return (
    <div>
      <AppContainer header={<AppHeader />}>
        <div className="flex p-0 mt-10">
          <img
            className="align-center w-full h-full p-0 m-0"
            src={ProfilePageImage}
          />
          <img
            className="justify-self-center w-auto h-32 rounded-full"
            src={user?.photoURL}
          />
        </div>
        <Container mb={200}>
          <Title className="poppin-font text-white text-5xl">
            Hi Again, {user?.displayName}
          </Title>
          <div className="">
            <DateRangePicker
              className="poppin-font"
              placeholder="Pick date"
              label="Event date"
              value={value}
              onChange={setValue}
              // withAsterisk
            />
            <Center className=" pt-4">
              <Button
                style={{ width: 600 }}
                className=" hover:bg-tan-200 bg-orangeSoda-200  shadow-md shadow-black-900 "
                onClick={() => showEntryDetails}
              >
                Filter
              </Button>
            </Center>
          </div>
          <Container mb={100}>
            <h1 className="poppin-font text-white">Past Entries</h1>
            <div>
              <Grid>
                {entries?.data?.map((entry) => (
                  <Grid.Col md={4} lg={4} sm={6}>
                    <Card
                      key={entry._id}
                      shadow="sm"
                      p="lg"
                      radius="md"
                      withBorder
                      style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Card.Section component="a"></Card.Section>

                      <Group position="apart" mt="md" mb="xs">
                        <Title order={5} weight={600}>
                          {/* {entry.title} */}
                          You were {entry.mood}
                        </Title>
                      </Group>
                      <Modal
                        onClose={() => setShowEntry(false)}
                        // title={entry.title}
                        overflow="inside"
                        opened={showEntry}
                        closeOnClickOutside={closeEntry}
                        className="bg-tan-100 "
                      >
                        {selectedEntry.content}
                        {/* selected entry gives us the entry for the given mood it matches */}
                      </Modal>

                      <Button
                        variant="light"
                        color="blue"
                        fullWidth
                        mt="md"
                        radius="md"
                        component="a"
                        onClick={() => showEntryDetails(entry)}
                      >
                        Read Entry
                      </Button>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </div>
          </Container>
          <Title className="poppin-font text-white">Recent Moods</Title>
          <MoodDonut />
        </Container>

        <AppFooter />
      </AppContainer>
    </div>
  );
}
