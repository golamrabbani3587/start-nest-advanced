import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/post.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { LoggingInterceptor } from 'src/common/logging/logging.interceptor';


@Controller('posts')
@UseInterceptors(LoggingInterceptor) // optional (you can also make it global)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Create a new post (protected by JWT guard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreatePostDto, @Req() req) {
    const user = req.user;
    return this.postsService.create(dto, user);
  }

  // Get all posts
  @Get()
  async findAll() {
    return this.postsService.findAll();
  }
}
