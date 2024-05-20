import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ERole } from 'src/auth/role/role.enum';

export type TLaunchInfo = {
  launchId: string;
  deviceId: string;
  launchTimeISO: string;
  version: string;
} | null;

export const LaunchID = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const launchId = req.headers['x-launch-id'];

    if (!launchId) return null;

    const restored = Buffer.from(launchId, 'base64').toString('utf8');

    const [deviceId, launchTimeISO, version] = restored.split('/');
    if (!deviceId || !launchTimeISO || !version) return null;

    return {
      launchId,
      deviceId,
      launchTimeISO,
      version,
    } as TLaunchInfo;
  },
);
