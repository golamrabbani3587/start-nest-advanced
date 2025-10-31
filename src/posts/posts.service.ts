import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./posts.entity";
import { CreatePostDto } from "./dtos/post.dto";
import { User } from "src/users/user.entity";

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  create(dto: CreatePostDto, user: User) {
    console.log('user in post service', user);
    
    const post = this.repo.create({ ...dto, author: user });
    return this.repo.save(post);
  }

  findAll() {
    return this.repo.find({ relations: ['author'] });
  }
}
