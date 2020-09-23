using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using webapi.dotnet.Data;
using webapi.dotnet.Models;

namespace webapi.dotnet.Service
{
    public class TodoItemService : ITodoItemService
    {
        private readonly ITodoContext _context;

        public TodoItemService(ITodoContext context)
        {
            _context = context;
        }

        public async Task Create(TodoItem todo)
        {
            await _context.Todos.InsertOneAsync(todo);
        }

        public async Task<bool> Delete(long id)
        {
            FilterDefinition<TodoItem> filter = Builders<TodoItem>.Filter.Eq(m => m.Id, id);
            DeleteResult deleteResult = await _context
                                                .Todos
                                              .DeleteOneAsync(filter).ConfigureAwait(false);
            return deleteResult.IsAcknowledged
                && deleteResult.DeletedCount > 0;
        }

        public async Task<IEnumerable<TodoItem>> GetAllTodos()
        {
            return await _context
                            .Todos
                            .Find(_ => true)
                            .ToListAsync();
        }

        public async Task<long> GetNextId()
        {
            return await _context.Todos.CountDocumentsAsync(new BsonDocument()) + 1;
        }

        public Task<TodoItem> GetTodo(long id)
        {
            FilterDefinition<TodoItem> filter = Builders<TodoItem>.Filter.Eq(m => m.Id, id);
            return _context
                    .Todos
                    .Find(filter)
                    .FirstOrDefaultAsync();

        }

        public async Task<bool> Update(TodoItem todo)
        {
            ReplaceOneResult updateResult =
                await _context
                        .Todos
                        .ReplaceOneAsync(
                            filter: g => g.Id == todo.Id,
                            replacement: todo);

            return updateResult.IsAcknowledged
                    && updateResult.ModifiedCount > 0;
        }
    }
}
