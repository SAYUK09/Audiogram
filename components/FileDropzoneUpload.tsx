import { Group, Text, useMantineTheme, rem } from "@mantine/core";
import { IconUpload, IconFileFilled, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, FileWithPath } from "@mantine/dropzone";

interface FileUploadProps extends Partial<DropzoneProps> {
  msg: string;
}

export function FileUpload({ onDrop, msg, ...props }: FileUploadProps) {
  const theme = useMantineTheme();

  function handleDrop(files: FileWithPath[]) {
    console.log(files, "accc");
  }

  return (
    <Dropzone
      onDrop={onDrop || handleDrop}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={3 * 1024 ** 2}
      multiple={false}
      {...props}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: rem(220), pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            size="3.2rem"
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size="3.2rem"
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconFileFilled size="3.2rem" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            {msg}
          </Text>

          <Text size="sm" color="dimmed" inline mt={7}>
            File should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}

export default FileUpload;
