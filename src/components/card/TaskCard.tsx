import { CardBody, Card, CardHeader, Heading } from '@chakra-ui/react';
import { IssuesType } from 'src/Types/Types';
import { CardInfo } from './cardInfo/CardInfo';
import { CardLinks } from './cardLinks/CardLinks';

interface TaskCardProps {
  data: IssuesType;
}

export const TaskCard: React.FC<TaskCardProps> = ({ data }) => {
  const githubUrl = data.userLink;
  const parts = githubUrl.split('/');
  const name = parts[parts.length - 1];

  return (
    <Card cursor="pointer" minWidth="400px" bgColor='#0d1117' borderColor='#848d97' border='1px solid'>
      <CardHeader>
        <Heading size="sm" color='#D3D3D3'>{data.title}</Heading>
      </CardHeader>
      <CardBody pt="0">
        <CardInfo data={data} />
        <CardLinks data={data} name={name} />
      </CardBody>
    </Card>
  );
};