import { EQuestionTopic } from 'src/question/question.enum';

export class CommandListItemDTO {
  id: string;
  name: string;
  description: string;
  marked: boolean;
}

export class CommandListQueryDTO {
  topic: EQuestionTopic | null;
  lastItemName: string | null;
  limit: number;
}

export class CreateCommandBodyDTO {
  name: string;
  description: string;

  topic: EQuestionTopic;
}

export class CreateCommandArgsBodyDTO {
  name: string;
  description: string;

  sequence: number;
}

export class CreateCommandOptionBodyDTO extends CreateCommandArgsBodyDTO {}
export class CreateCommandExampleBodyDTO extends CreateCommandArgsBodyDTO {}
