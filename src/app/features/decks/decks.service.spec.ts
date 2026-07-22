import { TestBed } from '@angular/core/testing';
import { DecksService } from './decks.service';
import { db } from '../../core/database/db';

describe('DecksService', () => {
  let service: DecksService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecksService);
    await db.decks.clear();
  });

  it('should support the full deck lifecycle', async () => {
    const id = await service.create({ name: 'Angular' });
    expect(await service.getById(id)).toEqual(expect.objectContaining({ name: 'Angular' }));

    await service.update(id, { name: 'Updated' });
    expect((await service.getById(id))?.name).toBe('Updated');

    await service.delete(id);
    expect(await service.getById(id)).toBeUndefined();
  });
});