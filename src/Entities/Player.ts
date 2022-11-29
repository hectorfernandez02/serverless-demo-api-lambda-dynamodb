export class Player {
  constructor(
    private playerId: string,
    private name: string,
    private team: string,
    private number: number
  ) {}

  public static create(
    playerId: string,
    name: string,
    team: string,
    number: number
  ): Player {
    return new Player(playerId, name, team, number);
  }
  public getPlayerId(): string {
    return this.playerId;
  }
  public getName(): string {
    return this.name;
  }
  public getTeam(): string {
    return this.team;
  }
  public getNumber(): number {
    return this.number;
  }
}
