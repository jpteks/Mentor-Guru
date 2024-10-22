import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const clientType = context.getType(); 
    let token: string;

    // Handle HTTP requests
    if (clientType === 'http') {
      const request = context.switchToHttp().getRequest();
      token = this.extractTokenFromHeader(request);
    }
    // Handle RPC requests
    else if (clientType === 'rpc') {
      const rpcData = context.switchToRpc().getData();
      console.log(rpcData)
      token = rpcData?.token;  // Extract token from the RPC data
    } 
    // Unsupported context type
    else {
      throw new HttpException(`Unsupported context type: ${clientType}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // If no token is provided, throw an unauthorized error
    if (!token) {
      this.throwUnauthorizedException(clientType, 'No token provided');
    }

    try {
      // Verify the JWT token
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

      // Attach the decoded JWT payload to the request or RPC data
      if (clientType === 'http') {
        context.switchToHttp().getRequest().user = decoded;
      } else if (clientType === 'rpc') {
        context.switchToRpc().getData().user = decoded;
        console.log(decoded)
      }
    } catch (err) {
      this.throwUnauthorizedException(clientType, 'Invalid token');
    }

    return true;
  }

  // Helper method to extract token from the Authorization header for HTTP requests
  private extractTokenFromHeader(request): string {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];  // Extract token from 'Bearer <token>'
    }
    return null;
  }

  // Handle Unauthorized Exceptions based on client type
  private throwUnauthorizedException(clientType: string, message: string): void {
    if (clientType === 'http') {
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    } else if (clientType === 'rpc') {
      throw new RpcException({ message, statusCode: HttpStatus.UNAUTHORIZED });
    }
  }
}
