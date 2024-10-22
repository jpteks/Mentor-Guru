import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { ROLES_KEY } from '../decorator/role.decorator';
import { UserRole } from '../users/schemas/User.schema';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // If no roles are required, allow access
    }

    // Extract the user from RPC data
    const rpcData = context.switchToRpc().getData();  // Retrieve the RPC data
    const user = rpcData.user;  // Access the attached user from JwtAuthGuard

    if (!user) {
      throw new RpcException({ message: 'User not found', statusCode: 403 });
    }

    const hasRole = requiredRoles.some((role) => user.role === role);
    if (!hasRole) {
      throw new RpcException({ message: 'Forbidden: Insufficient roles', statusCode: 403 });
    }

    return true;
  }
}
