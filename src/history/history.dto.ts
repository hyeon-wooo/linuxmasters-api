import { ApiProperty, PartialType } from '@nestjs/swagger';

export class SaveLaunchDTO {
  @ApiProperty({})
  deviceName: string;

  @ApiProperty({})
  os: string;

  @ApiProperty({})
  version: string;
}

export class SaveScreenHistoryDTO extends PartialType(SaveLaunchDTO) {
  @ApiProperty({})
  screenName: string;
}
