import { Card, Image, Text } from "@mantine/core";

export default function({ description, src }){
  return (
    <Card shadow='sm' padding='sm'>
      <Card.Section mb='xs'>
        <Image  src={`/api/images/${src}`} height={160} alt={description} /> 
        {/* TODO size it well */}
      </Card.Section>

      <Text size='sm' color='dimmed'>
        {description}
      </Text>
    </Card>
  );
}